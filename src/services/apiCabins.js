import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase
    .from('cabins')
    .select('*')

  if (error) {
    console.error(error)
    throw new Error("Cabins could not be loaded")
  }

  return data
}

export async function createEditCabin(newCabin, id) {
  // https://edqjmdqwqiesvhmokbdr.supabase.co/storage/v1/object/public/cabins/cabin-001.jpg
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl)
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`


  // 1. Create/edit cabin
  let query = supabase.from('cabins')

  // A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }])
  // B) EDITE
  // if (id) query = query.update(newCabin) .eq('id', id) 
  if (id) query = query.update({...newCabin, image: imagePath}) .eq('id', id) 

  const { data, error } = await query.select().single()
  
  if (error) {
    console.error(error)
    throw new Error("Cabin could not be created")
  }

  // 2. Upload image
  if (hasImagePath) return data

  const { error: storageError } = await supabase
    .storage
    .from('cabins')
    .upload(imageName, newCabin.image)

  // 3. Delete the abin IF there was an error uploading image
  if (storageError) {
    await supabase
      .from('cabins')
      .delete()
      .eq('id', data.id)

    console.error(storageError)
    throw new Error("Cabin image could not be uploaded and the cabin was not created")
  }

  return data
}

export async function deleteCabin(id) {
  const { error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id)

  if (error) {
    console.error(error)
    throw new Error("Cabin could not be deleted")
  }
}
