import React, { useState } from 'react'
import styled from 'styled-components'
import H5_DATACENTER_BACKGROUND from '../../assets/images/H5_dataCenter_background.png'
import { useTranslation } from 'react-i18next'
import { ButtonDefault } from '../../components/Button'
import VOTING_BTN_2 from '../../assets/images/voting_btn_2.png'
import { isJSON } from '../../utils'
import { message } from 'antd'
import web3 from '../../contracts/initWeb3'
import { useSelector } from 'react-redux'
import { ContractPokerFiGovernor } from '../../contracts'
import axios from 'axios'

const ProposalMaskWapple = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(21, 27, 30, 0.93);
  z-index: 1111;
`

export const Content = styled.div`
  width: 689px;
  margin-left: calc(50% - 349px);
  height: 80vh;
  background: url(${H5_DATACENTER_BACKGROUND}) no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  margin-top: 164px;
  padding: 50px;
  position: relative;
`

const ProposalReturn = styled.div`
  width: 150px;
  height: 60px;
  border: 1px solid #1f4b57;
  border-radius: 30px;
  font-size: 28px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #35dddb;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 25px;
  right: 27px;
  cursor: pointer;
`

const VotingForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-height: 64vh;
`

const FormTitle = styled.div`
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #9cbbbf;
  line-height: 72px;
`

const FormTitleInput = styled.input`
  width: 540px;
  height: 90px;
  background: rgba(58, 78, 94, 0.21);
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #eaeaea;
  line-height: 36px;
  padding: 0 30px;
`

const FormTitleInputTextArea = styled.textarea`
  font-size: 24px;
  width: 100%;
  height: 100%;
  background: transparent;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #eaeaea;
  line-height: 36px;
`

const FormTitleInputDiv = styled.div`
  width: 540px;
  height: calc(80vh - 536px);
  padding: 35px 30px;
  background: rgba(58, 78, 94, 0.21);
`

const AbiBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
  width: 100%;
`

const Selects = styled.select`
  width: 140px;
  height: 40px;
  font-size: 16px;
  font-weight: bold;
`

const SelectOption = styled.option`
  font-size: 16px;
`

interface ChildType {
  list: { type: string; name: string; value: string }[]
  name: string
}

export default function ProposalMaskRelease({
  setProposalStatus,
  setIsTrueVotingHooks,
}: {
  setProposalStatus: () => void
  setIsTrueVotingHooks: (s: boolean) => void
}) {
  const { t } = useTranslation()

  const myAddress = useSelector((state: any) => state.userInfo.address)

  const [abiContent, setAbiContent] = useState<string>('')
  const [methodParametersList, setMethodParametersList] = useState<ChildType[]>([])
  const [defaultValue, setDefaultValue] = useState('')

  const onFinish = async () => {
    let isTrueCalldatasChange = await setCalldatasChange()
    if (isTrueCalldatasChange) {
      let { isTrue, DATA_HEX } = await setCalldatasBytens()
      if (isTrue) {
        try {
          let params = {
            targets: (document as any).getElementById('title_address').value,
            values: 0,
            calldatas: DATA_HEX,
            descriptionHash: (document as any).getElementById('descriptionHash').value,
          }
          if (params.targets === '' || params.targets.length !== 42) {
            alert('Incorrect contract address')
            return false
          }
          if (params.descriptionHash === '') {
            alert('Description cannot be empty')
            return false
          }
          console.log('params', params)
          createData(params)
        } catch (error) {
          console.log(error)
        }
      }
    }
  }

  /** 验证格式 */
  const setCalldatasChange = async () => {
    try {
      const data: any = methodParametersList.find((item) => item.name === defaultValue)
      let array: any[] = []
      data.list.forEach((element: { name: string; type: string; value: string }) => {
        if (element.value === '') {
          throw new Error(`${element.name}: Can not be empty!`)
        }
        if (element.type === 'address' && element.value.length !== 42) {
          throw new Error(`${element.name}: Can not be empty!`)
        }
        array.push(element.value)
      })
      return true
    } catch (error: any) {
      console.log('error.message', error.message)
      message.error(error.message)
      return false
    }
  }

  /** 生成bytens字节 */
  const setCalldatasBytens = async () => {
    const loading = message.loading('loading...', 0)
    try {
      const data: any = methodParametersList.find((item) => item.name === defaultValue)
      let array: any[] = []
      data.list.forEach((element: { name: string; type: string; value: string }) => {
        array.push(element.value)
      })
      const JSON_CONTENT: any[] = JSON.parse(abiContent)
      const list = JSON_CONTENT.find((item: any) => item.name === data.name)
      let DATA_HEX = web3.eth.abi.encodeFunctionCall(list, array)
      // setCalldatas(DATA_HEX)
      if (DATA_HEX) {
        console.log(DATA_HEX)
        setTimeout(loading, 500)
        return { isTrue: true, DATA_HEX }
      } else {
        return { isTrue: false, DATA_HEX: '' }
      }
    } catch (error) {
      console.log(';', error)
      setTimeout(loading, 500)
      return { isTrue: false, DATA_HEX: '' }
    }
  }

  const parsingAbi = async () => {
    try {
      let isTrue = isJSON(abiContent)
      if (isTrue) {
        const JSON_CONTENT: any[] = JSON.parse(abiContent)
        let METHOD_PARAMETERS_List: ChildType[] = []
        console.log(JSON_CONTENT instanceof Array)
        console.log(JSON_CONTENT.length !== 0)
        if (!(JSON_CONTENT instanceof Array)) {
          alert(t('json_tips'))
          return false
        }
        if (JSON_CONTENT.length === 0) {
          alert(t('json_tips'))
          return false
        }
        JSON_CONTENT.forEach((item) => {
          if (item.inputs !== undefined && item.inputs.length > 0) {
            let child: ChildType = {
              name: item.name,
              list: [],
            }
            item.inputs.forEach((element: any) => {
              child.list.push({ name: element.name, type: element.type, value: '' })
            })
            METHOD_PARAMETERS_List.push(child)
          } else {
            if (item.name) METHOD_PARAMETERS_List.push({ name: item.name, list: [] })
          }
        })
        if (METHOD_PARAMETERS_List.length > 0) setDefaultValue(METHOD_PARAMETERS_List[0].name)
        setMethodParametersList(METHOD_PARAMETERS_List)
      } else {
        alert('Not json')
      }
    } catch (error) {
      console.log('errors', error)
    }
  }

  /** 动态获取合约地址 -abi */
  const catTitleAddress = async ({ target }: any) => {
    if (target.value !== undefined && target.value.length === 42) {
      setAbiContent('')
      setMethodParametersList([])
      axios
        .get(
          `https://api.bscscan.com/api?module=contract&action=getabi&address=${target.value}&apikey=KDFT5SYSNNFUBPEZI1113JE2NIAAKV7CW7`,
        )
        .then(({ data }) => {
          let result = data.result
          let result_array = JSON.parse(result)
          if (result_array !== undefined && result_array.length > 0) {
            setAbiContent(result)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  // 创建提案
  const createData = async (params: any) => {
    if (params.calldatas === '') return false
    console.log(params)
    try {
      ContractPokerFiGovernor.methods
        .propose([params.targets], [params.values], [params.calldatas], params.descriptionHash)
        .send({
          from: myAddress,
        })
        .on('transactionHash', function (hash: any) {
          console.log(hash)
        })
        .on('receipt', function (receipt: any) {
          alert('Successful')
          setAbiContent('')
          setMethodParametersList([])
          // setCalldatas('')
          setDefaultValue('')
          setProposalStatus()
          setIsTrueVotingHooks(false)
          setTimeout(() => {
            setIsTrueVotingHooks(true)
          }, 50)
        })
        .on('error', function (error: any, receipt: any) {
          console.log(receipt)
        })
    } catch (error) {
      console.log('sss', error)
    }
    // let datas = await ContractPokerFiSharesPKS.methods.delegate(myAddress).send({
    //   from: myAddress,
    // })
    // console.log('datas', datas)
    // if (datas) {

    // }
  }

  return (
    <ProposalMaskWapple>
      <ProposalReturn onClick={setProposalStatus}>{t('voting_return')}</ProposalReturn>
      <Content>
        <VotingForm id="form">
          <FormTitle>{t('voting_release_form_1')}</FormTitle>
          <FormTitleInput
            autoComplete={'off'}
            name="title_address"
            placeholder={'address'}
            id="title_address"
            onChange={catTitleAddress}
          />
          <FormTitle>{t('voting_release_form_2')}</FormTitle>
          <FormTitleInputDiv>
            <FormTitleInputTextArea
              value={abiContent}
              name="content"
              placeholder={`Enter your ABI json [{"inputs":[], "name":[], "type":"function"}]`}
              onChange={({ target }) => {
                setAbiContent(target.value)
              }}
            />
          </FormTitleInputDiv>
          <AbiBtn>
            <ButtonDefault
              style={{
                width: '108px',
                height: '34px',
                marginRight: '30px',
                fontSize: '16px',
                background: `url(${VOTING_BTN_2}) no-repeat`,
                backgroundSize: `100% 100%`,
              }}
              onClick={() => {
                setAbiContent('')
                setMethodParametersList([])
              }}
            >
              Clear
            </ButtonDefault>
            <ButtonDefault style={{ width: '108px', height: '34px', fontSize: '16px' }} onClick={parsingAbi}>
              Parse
            </ButtonDefault>
          </AbiBtn>
          {methodParametersList.length > 0 && (
            <Selects
              defaultValue={defaultValue}
              onChange={({ target }) => {
                setDefaultValue(target.value)
              }}
            >
              {methodParametersList.map((item, i) => (
                <SelectOption key={i} value={item.name}>
                  {item.name}
                </SelectOption>
              ))}
            </Selects>
          )}
          {methodParametersList.map((item, i) => {
            return (
              <div key={i}>
                {defaultValue === item.name && (
                  <>
                    <FormTitle>{item.name}</FormTitle>
                    {item.list.map((ite, s) => {
                      return (
                        <div key={s} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                          <div style={{ width: '15%', fontSize: '18px', color: '#9cbbbf', fontWeight: 'bold' }}>
                            {ite.name}:
                          </div>
                          <FormTitleInput
                            autoComplete={'off'}
                            name={ite.name}
                            placeholder={ite.type}
                            onChange={({ target }) => {
                              ite.value = target.value
                            }}
                          />
                        </div>
                      )
                    })}
                  </>
                )}
              </div>
            )
          })}
          <FormTitle>{t('voting_release_form_3')}</FormTitle>
          <FormTitleInput
            autoComplete={'off'}
            name="descriptionHash"
            placeholder={'describe text'}
            id="descriptionHash"
          />
        </VotingForm>
        <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', marginTop: '63px' }}>
          <ButtonDefault onClick={() => onFinish()}>{t('voting_release_form_submit')}</ButtonDefault>
        </div>
      </Content>
    </ProposalMaskWapple>
  )
}
