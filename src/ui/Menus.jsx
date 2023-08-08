import { createContext, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.$position.x}px;
  top: ${(props) => props.$position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext()

function Menus({ children }) {
  const [opendId, setOpenId] = useState('')
  const [position, setPosition] = useState(null)
  const close = () => setOpenId('')
  const open = setOpenId

  return <MenusContext.Provider value={{ opendId, close, open, position, setPosition }}>
    {children}
  </MenusContext.Provider>
}

function Toggle({ id }) {
  const { opendId, close, open, setPosition } = useContext(MenusContext)
  useEffect(() => {
    function handleScroll() {
      if (opendId) {
        close();
        document.removeEventListener("wheel", handleScroll);
      }
    }
    if (opendId) document.addEventListener("wheel", handleScroll);
 
    return () => document.removeEventListener("wheel", handleScroll);
  }, [opendId]);
  function handleClick(e) {
    e.stopPropagation()
    const rect = e.target.closest('button')
    const rectPosition = rect.getBoundingClientRect()
    setPosition({
      x: window.innerWidth - rectPosition.width - rectPosition.x,
      y: rectPosition.y + rectPosition.height + 8
    })

    opendId !== id || !opendId ? open(id) : close()
  }
  return <StyledToggle onClick={handleClick}>
    <HiEllipsisVertical />
  </StyledToggle>
}

function List({ id, children }) {
  const { opendId, position, close } = useContext(MenusContext)
  const { ref } = useOutsideClick(close, false)

  if (id !== opendId) return null

  return createPortal(<StyledList ref={ref} $position={position}>
    { children }
  </StyledList>, document.body)
}
function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext)

  function handleClick() {
    onClick?.()
    close()
  }

  return <StyledButton onClick={handleClick}>{icon}<span>{children}</span></StyledButton>
}

Menus.Menu = StyledMenu
Menus.Toggle = Toggle
Menus.List = List
Menus.Button = Button

export default Menus



























// function Toggle({ id }) {
//   const { opendId, close, open } = useContext(MenusContext)

//   function handleClick() {
//     opendId === '' || opendId !== id ? open(id) : close()
//   }
//   return <StyledToggle onClick={handleClick}>
//     <HiEllipsisVertical />
//   </StyledToggle>
// }

// function List({ id, children }) {
//   const { opendId } = useContext(MenusContext)

//   if (id !== opendId) return null

//   return createPortal(<StyledList>{ children }</StyledList>)
// }
