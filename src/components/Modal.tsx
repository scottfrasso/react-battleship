import React from 'react'
import ReactDOM from 'react-dom'
import classes from './Modal.module.css'

type BackdropProps = {
  onClose: (e: React.MouseEvent) => void
}

const Backdrop = (props: BackdropProps) => {
  return <div className={classes.backdrop} />
}

type ModalOveralyProps = {
  children?: React.ReactNode
}

const ModalOverlay = (props: ModalOveralyProps) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  )
}

const portalElement = document.getElementById('overlays') as HTMLElement

type Props = {
  onClose: (e: React.MouseEvent) => void
  children?: React.ReactNode
}

const Modal = (props: Props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </React.Fragment>
  )
}

export default Modal
