import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import announcement_left from '../../assets/images/announcement_left.png'
import announcement_right from '../../assets/images/announcement_right.png'
import technologyPage_background from '../../assets/images/technologyPage_background.png'
import axios from 'axios'
import AppBottom from '../../components/AppBottom'

const AnnouncementWapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  margin-top: 30px;
  width: 1016px;
  margin-left: calc(50% - 508px);
  zoom: ${window.screen.width / 1920};
`
const AnnouncementTitle = styled.div`
  width: 800px;
  text-align: center;
  padding: 15px 40px;
  box-sizing: border-box;
  font-size: 30px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #35ddc0;
  line-height: 60px;
  position: relative;
  margin: 0 auto;
`
const IconLeft = styled.div`
  width: 63px;
  height: 52px;
  background: url(${announcement_left}) no-repeat;
  position: absolute;
  left: 0;
  top: 0;
`
const IconRight = styled.div`
  width: 63px;
  height: 52px;
  background: url(${announcement_right}) no-repeat;
  position: absolute;
  right: 0;
  bottom: 0;
`
export const AnnouncementContent = styled.div`
  width: 1016px;
  height: 628px;
  background: url(${technologyPage_background}) no-repeat center;
  background-size: 100%;
  position: relative;
  box-sizing: border-box;
  padding: 80px 60px;
`
const ContentText = styled.div`
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #eaeaea;
  line-height: 30px;
  .outer-container,
  .content {
    width: 896px;
    height: 470px;
    text-align: left;
    p {
      margin-bottom: 10px;
    }
  }
  .outer-container {
    position: relative;
    overflow: hidden;
  }
  .inner-container {
    position: absolute;
    left: 0;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  /* for Chrome */
  .inner-container::-webkit-scrollbar {
    display: none;
  }
`

export default function Announcement() {
  const { i18n } = useTranslation()

  const [title, setTitle] = useState('')
  const [list, setList] = useState<any[]>([])

  useEffect(() => {
    axios
      .get('./staticText/notice.json')
      .then(function (res) {
        console.log(res.data.announcement)
        if (i18n.language === 'en') {
          setTitle(res.data.announcement.title_en)
          setList(res.data.announcement.list_en)
        } else {
          setTitle(res.data.announcement.title_zh)
          setList(res.data.announcement.list_zh)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [i18n.language])

  return (
    <div style={{ width: '100vw' }}>
      <AnnouncementWapper>
        <AnnouncementTitle>
          <IconLeft />
          <IconRight />
          <h3 style={{ color: 'white' }}>{title}</h3>
        </AnnouncementTitle>
        <AnnouncementContent>
          <ContentText>
            <div className="outer-container">
              <div className="inner-container">
                <div className="content">
                  {list.length > 0 &&
                    list.map((item, index) => {
                      return <p key={index}>{item}</p>
                    })}
                </div>
              </div>
            </div>
          </ContentText>
        </AnnouncementContent>
      </AnnouncementWapper>
      <AppBottom link="/announcement" />
    </div>
  )
}
