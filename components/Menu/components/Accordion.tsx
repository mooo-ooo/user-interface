import React, { ReactNode, useState } from "react"
import styled from "styled-components"
import { FiChevronDown, FiChevronUp } from "react-icons/fi"
import { MENU_ENTRY_HEIGHT } from "../config"
import { LinkLabel, MenuEntry } from "./MenuEntry"
import { PushedProps } from "../types"

interface Props extends PushedProps {
  label: string
  icon?: React.ReactElement
  initialOpenState?: boolean
  className?: string
  children: ReactNode
  isActive?: boolean
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  // Safari fix
  flex-shrink: 0;
`;

const AccordionContent = styled.div<{ isOpen: boolean; isPushed: boolean; maxHeight: number }>`
  max-height: ${({ isOpen, maxHeight }) => (isOpen ? `${maxHeight}px` : 0)};
  transition: max-height 0.3s ease-out;
  overflow: hidden;
  border-color: ${({ isOpen, isPushed }) => (isOpen && isPushed ? "rgba(133, 133, 133, 0.1)" : "transparent")};
  border-style: solid;
  border-width: 1px 0;
`;

const Accordion: React.FC<Props> = ({
  label,
  icon = null,
  isPushed,
  pushNav,
  initialOpenState = false,
  children,
  className,
  isActive,
}) => {
  const [isOpen, setIsOpen] = useState(initialOpenState)
  const handleClick = () => {
    if (isPushed) {
      setIsOpen((prevState) => !prevState)
    } else {
      pushNav(true)
      setIsOpen(true)
    }
  }

  return (
    <Container>
      <MenuEntry onClick={handleClick} className={className} isActive={isActive} role="button">
        {icon}
        <LinkLabel isPushed={isPushed}>{label}</LinkLabel>
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </MenuEntry>
      <AccordionContent
        isOpen={isOpen}
        isPushed={isPushed}
        maxHeight={React.Children.count(children) * MENU_ENTRY_HEIGHT}
      >
        {children}
      </AccordionContent>
    </Container>
  )
}

export default Accordion