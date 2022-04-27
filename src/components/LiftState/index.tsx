import React from 'react'
import Destruction_rising from '../../assets/images/Destruction_rising.png'
import Destruction_falling from '../../assets/images/Destruction_falling.png'

interface LiftStateProps {
  type: boolean
}

export default function LiftState({ type }: LiftStateProps) {
  if (type) {
    return <img src={Destruction_rising} width="9px" height="19px" alt="" />
  } else {
    return <img src={Destruction_falling} width="9px" height="19px" alt="" />
  }
}
