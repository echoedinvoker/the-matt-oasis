import supabase, { supabaseUrl } from "./supabase";


export async function signup({ email, password, fullName, role = 'staff', nationalID = '' }) {

  let user;
  if (role !== 'staff') {
    const res1 = await fetch('https://ipinfo.io/ip')
    const ip = await res1.text()
    // free plan to 8/20
    const res2 = await fetch(`https://ipinfo.io/${ip}?token=43db77e12cd720`)
    const { country, region } = await res2.json()

    const { data, error: error1 } = await supabase
      .from('guests')
      .insert([
        {
          fullName,
          email,
          nationalID,
          nationality: region,
          countryFlag: `https://flagcdn.com/${country.toLowerCase()}.svg`
        },
      ])
      .select()

    if (error1) throw new Error(error1.message)

    user = data
  }

  let { data, error } = await supabase.auth.signUp({
    email, password,
    options: {
      data: {
        fullName,
        role,
        guestId: role !== 'staff' ? user.at(0).id : undefined
        // guestId: 137
      }
    }
  })

  if (error) throw new Error(error.message)

  return data
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) throw new Error(error.message)

  return { data, error }
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession()
  if (!session.session) return null
  const { data, error } = await supabase.auth.getUser()

  if (error) throw new Error(error.message)

  return data?.user
}

export async function logout() {
  let { error } = await supabase.auth.signOut()

  if (error) throw new Error(error.message)
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. Update password OR fullName
  let updateData;
  if (password) updateData = { password }
  if (fullName) updateData = { data: { fullName } }

  const { data, error } = await supabase.auth.updateUser(updateData)

  if (error) throw new Error(error.message)
  if (!avatar) return data

  // 2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`
  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar)

  console.log(storageError)
  if (storageError) throw new Error(storageError.message)

  // 3. Update avatar in the user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`
    }
  })

  if (error2) throw new Error(error2.message)
  return updatedUser
}
