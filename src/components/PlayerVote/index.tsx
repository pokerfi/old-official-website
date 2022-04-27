import React from 'react'
import styled from 'styled-components'
import { Player } from 'video-react'
import { STATIC_URL } from '../../contracts/constant'

export const VideoStyles = styled.div`
  width: 610px;
  height: 540px;
  box-sizing: border-box;
  padding: 105px 50px 50px 50px;
  position: relative;
  .video-react {
    padding-top: 75% !important;
    position: relative;
  }
  .video-react-video {
    width: 30%;
    position: absolute;
    left: 170px;
  }
  .video-react-big-play-button {
    width: 80px;
    height: 80px;
    opacity: 0.17;
    border-radius: 50%;
    position: absolute;
    left: 210px;
    top: 130px;
    :before {
      font-size: 50px;
      line-height: 76px;
    }
  }
`

function PlayerVote1() {
  return (
    <VideoStyles>
      <Player>
        <source src={STATIC_URL + 'video/pokerfi_1.mp4'} />
      </Player>
    </VideoStyles>
  )
}
function PlayerVote2() {
  return (
    <VideoStyles>
      <Player>
        <source src={STATIC_URL + 'video/pokerfi_2.mp4'} />
      </Player>
    </VideoStyles>
  )
}
function PlayerVote3() {
  return (
    <VideoStyles>
      <Player>
        <source src={STATIC_URL + 'video/pokerfi_3_zh.mp4'} />
      </Player>
    </VideoStyles>
  )
}
function PlayerVote4() {
  return (
    <VideoStyles>
      <Player>
        <source src={STATIC_URL + 'video/pokerfi_4_zh.mp4'} />
      </Player>
    </VideoStyles>
  )
}

function PlayerVoteMini1() {
  return (
    <Player className="viodeClass">
      <source src={STATIC_URL + 'video/pokerfi_1.mp4'} />
    </Player>
  )
}

function PlayerVoteMini2() {
  return (
    <Player className="viodeClass">
      <source src={STATIC_URL + 'video/pokerfi_2.mp4'} />
    </Player>
  )
}

function PlayerVoteMini3() {
  return (
    <Player className="viodeClass">
      <source src={STATIC_URL + 'video/pokerfi_3_zh.mp4'} />
    </Player>
  )
}

function PlayerVoteMini4() {
  return (
    <Player className="viodeClass">
      <source src={STATIC_URL + 'video/pokerfi_4_zh.mp4'} />
    </Player>
  )
}

export {
  PlayerVote1,
  PlayerVote2,
  PlayerVote3,
  PlayerVote4,
  PlayerVoteMini1,
  PlayerVoteMini2,
  PlayerVoteMini3,
  PlayerVoteMini4,
}
