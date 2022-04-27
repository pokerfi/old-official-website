import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import public_background from "../../assets/images/public_background.png";
import public_modelBg from "../../assets/images/public_modelBg.png";
import { ButtonDefault } from '../../components/Button';
import { BaseColorBg } from '../help';
import AppBottom from '../../components/AppBottom'


const PublicWapper = styled.div<{active: boolean}>`
    width: 1015px;
    height: 740px;
    background: ${({active}) => !active ? `url(${public_background}) no-repeat center`:`transparent`};
    background-size: 100%;
    position: relative;
    margin-left: calc(50% - 507.5px);
    zoom: ${window.screen.width / 1920};
`
const PublicTextStyles = styled.div`
    width: 500px;
    height: 550px;
    position: absolute;
    right: 20px;
    top: 130px;
    box-sizing: border-box;
    padding: 50px 30px;
    text-align: center;
`
const PublicText = styled.div`
    height: 75px;
    text-align: center;
`
const Label = styled.div`
    display: flex;
    flex-direction: row;
    .icon{
        display: block;
        width: 4px;
        height: 17px;
        background: #1CE5E5;
        border-radius: 2px;
    }
    p{  
        display: block;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #F8FFFD;
        opacity: 0.9;
        margin-left: 15px;
    }
`
export const Address = styled.a`
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    text-decoration: underline;
    color: #35DDC0;
    line-height: 50px;
    text-decoration:none;
    
`
const ModelAddress = styled(Address)`
    line-height: 24px;
`
export const ModelStyles = styled.div`
    width: 1280px;
    height: 897px;
    background: url(${public_modelBg}) no-repeat;
    background-size: 100% 100%;
    position: fixed;
    top: 8px;
    left: 235px;
`
export const ModelInfo = styled.div`
    width: 1060px;
    height: 540px;
    margin-top: 220px;
    margin-left: 200px;
    position: relative;
`
export const ModelTitle = styled.h3`
    font-size: 24px;
    font-family: Source Han Sans CN;
    font-weight: 800;
    color: #FFFFFF;
    line-height: 80px;
    background: linear-gradient(13deg, #0CE2FF 0%, #1BFFEC 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: center;
`
export const Modelback = styled.div`
    width: 107px;
    height: 43px;
    border: 1px solid #1F4B57;
    border-radius: 22px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #35DDC0;
    line-height: 43px;
    text-align: center;
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
`
const ContentText = styled.div`
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #EAEAEA;
    line-height: 30px;
    .outer-container,.content {
        width: 100%; 
        height: 420px;
        text-align: left;
        box-sizing: border-box;
        padding: 20px 70px;
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

export default function Public() {
    
    const { t } = useTranslation();
    const { i18n  } = useTranslation();
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div style={{width: '100vw'}}>
        <PublicWapper active={isOpen}>
            <PublicTextStyles>
                <PublicText>
                    <Label>
                        <span className='icon'></span>
                        <p>{t('Address_burning')}:</p>
                    </Label>
                    <Address href='https://bscscan.com/address/0x92cE18117DA27c5B7A409F08800D0Ad2cB961138'>0x92cE18117DA27c5B7A409F08800D0Ad2cB961138</Address>
                </PublicText>
                <PublicText>
                    <Label>
                        <span className='icon'></span>
                        <p>{t('Address_fund')}:</p>
                    </Label>
                    <Address href='https://bscscan.com/address/0x68fe7967b84f2e3aD15620cB03bA51E36a547Df7'>0x68fe7967b84f2e3aD15620cB03bA51E36a547Df7</Address>
                </PublicText>
                <PublicText>
                    <Label>
                        <span className='icon'></span>
                        <p>{t('Address_contract')}:</p>
                    </Label>
                    <Address href='https://bscscan.com/address/0x76000F17fD34a1cB1Ccd78DF89F89fE1319CAca0'>0x76000F17fD34a1cB1Ccd78DF89F89fE1319CAca0</Address>
                </PublicText>
                <PublicText>
                    <Label>
                        <span className='icon'></span>
                        <p>{t('Address_supporting')}:</p>
                    </Label>
                    <Address href='https://bscscan.com/address/0x2f67250fC4eF41689E98931e4D2927E7665a0329'>0x2f67250fC4eF41689E98931e4D2927E7665a0329</Address>
                </PublicText>
                <PublicText>
                    <Label>
                        <span className='icon'></span>
                        <p>{t('Address_gas')}:</p>
                    </Label>
                    <Address href='https://bscscan.com/address/0x5772e1Cdb6D6240c581792303189851e612c21f1'>0x5772e1Cdb6D6240c581792303189851e612c21f1</Address>
                </PublicText>
                <ButtonDefault onClick={() =>setIsOpen(true)}>{t('view')}</ButtonDefault>
            </PublicTextStyles>
            {
                isOpen && <ModelStyles>
                    <ModelInfo>
                        <ModelTitle>{t('important')}</ModelTitle>
                        <Modelback onClick={() =>setIsOpen(false)}>{t('back')}</Modelback>
                        {
                            i18n.language === 'en' ? <ContentText>
                            <div className="outer-container">
                                <div className="inner-container">
                                    <div className="content">
                                        <p>PokerFi players, with the official launch of PokerFi and the first batch of cards on sale, the entire planet's economic system has officially opened for operation, now the core consensus contract address involving the operation of the economic system will be publicized, so that you can easily understand the operation of the entire economic system and monitor the rationality of each expenditure, the specific contract address is as follows:</p>
                                        <ModelAddress href='https://bscscan.com/address/0x89Aba1453f58aB08056DA973163A67EFed95A432'>PK：0x89Aba1453f58aB08056DA973163A67EFed95A432</ModelAddress> <br />
                                        <ModelAddress href='https://bscscan.com/address/0xF61b203B7FF3be1D6a53f902d5CbC3e508Fa728F'>PK_1：0xF61b203B7FF3be1D6a53f902d5CbC3e508Fa728F</ModelAddress>
                                        <br />
                                        <br />
                                        <p>Poker (NFT Asset Contract)：<ModelAddress href='https://bscscan.com/address/0x3DDECfa3E7D4Ff87DD6533095F47F01E71Cc14fe'>0x3DDECfa3E7D4Ff87DD6533095F47F01E71Cc14fe</ModelAddress></p>
                                        <p>CardMarket (card trading contract)：<ModelAddress href='https://bscscan.com/address/0x1DBE23A144b74A2C157Dd9d74d66c39102bBa4A4'>0x1DBE23A144b74A2C157Dd9d74d66c39102bBa4A4</ModelAddress></p>
                                        <p>SlotStore (Card Slot Sales Contract)：<ModelAddress href='https://bscscan.com/address/0x6200266D5e9fd8226D496036c475BB350a3232c4'>0x6200266D5e9fd8226D496036c475BB350a3232c4</ModelAddress></p>
                                        <p>CardStore (card sales contract)：<ModelAddress href='https://bscscan.com/address/0x471AfCB0923796D33922785915E09469970D1D10'>0x471AfCB0923796D33922785915E09469970D1D10</ModelAddress></p>
                                        <p>MiningPool (mining pool contract)：<ModelAddress href='https://bscscan.com/address/0x9c93e6100183235999A3085Af48C8b2945A4e9A2'>0x9c93e6100183235999A3085Af48C8b2945A4e9A2</ModelAddress></p>
                                        <p>JokerActivate (Special NFT Asset Contract)：<ModelAddress href='https://bscscan.com/address/0x9c93e6100183235999A3085Af48C8b2945A4e9A2'>0x9c93e6100183235999A3085Af48C8b2945A4e9A2</ModelAddress></p>
                                        <br />
                                        <p>【Card slot sales receiving contract】</p>
                                        <p><ModelAddress href='https://bscscan.com/address/0x587fcAbB403f617c965637870db5514d40856e4c'>0x587fcAbB403f617c965637870db5514d40856e4c</ModelAddress>（smart contract）</p>
                                        <p><ModelAddress href='https://bscscan.com/address/0x4a2AeD8b592ef42a5bc30278310842f5D2334C68'>0x4a2AeD8b592ef42a5bc30278310842f5D2334C68</ModelAddress>（address for receiving card slot sales）</p>
                                        <p>50% to <ModelAddress href='https://bscscan.com/address/0x68fe7967b84f2e3aD15620cB03bA51E36a547Df7'>0x68fe7967b84f2e3aD15620cB03bA51E36a547Df7</ModelAddress>（Community Ecology Building Fund）</p>
                                        <p>50% to be used for destruction, left at <ModelAddress href='https://bscscan.com/address/0x587fcAbB403f617c965637870db5514d40856e4c '>0x587fcAbB403f617c965637870db5514d40856e4c </ModelAddress>（event initiated by signature, and can only be used for destruction, contract automatically executed）</p>
                                        <br />
                                        <p>【Card Sales Receiving Contract】</p>
                                        <p><ModelAddress href='https://bscscan.com/address/0x587fcAbB403f617c965637870db5514d40856e4c'>0x76000F17fD34a1cB1Ccd78DF89F89fE1319CAca0</ModelAddress></p>
                                        <p><ModelAddress href='https://bscscan.com/address/0x2f67250fC4eF41689E98931e4D2927E7665a0329'>0x2f67250fC4eF41689E98931e4D2927E7665a0329</ModelAddress></p>
                                        <p>70% to<ModelAddress href='https://bscscan.com/address/0x92cE18117DA27c5B7A409F08800D0Ad2cB961138 '>0x92cE18117DA27c5B7A409F08800D0Ad2cB961138 </ModelAddress>（specifically for secondary market PK token buyback destruction）</p>
                                        <p>30% for adding liquidity support retained at <ModelAddress href='https://bscscan.com/address/0x76000F17fD34a1cB1Ccd78DF89F89fE1319CAca0 '>0x76000F17fD34a1cB1Ccd78DF89F89fE1319CAca0 </ModelAddress>（initiated by the signature event and can only be used to add liquidity, the contract is automatically executed）</p>
                                        <br />
                                        <p>【NFT card transaction fee receiving contract】</p>
                                        <p><ModelAddress href='https://bscscan.com/address/0xA883795C2fa5D62d8517702fdc45fAAe811DE8de'>0xA883795C2fa5D62d8517702fdc45fAAe811DE8de</ModelAddress></p>
                                        <br />
                                        <p>【Gas fee allocation contract address】</p>
                                        <p><ModelAddress href='https://bscscan.com/address/0xA883795C2fa5D62d8517702fdc45fAAe811DE8de'>0x5772e1Cdb6D6240c581792303189851e612c21f1</ModelAddress>(events are initiated by signatures and can only be assigned to specified addresses according to the contract logic)</p>
                                        <p>30% to <ModelAddress href='https://bscscan.com/address/0xdEA2284928a4B56C4c1C55B8e772cd0523BC923E'>0xdEA2284928a4B56C4c1C55B8e772cd0523BC923E</ModelAddress>(event initiated by signature, dedicated to secondary market PK token redeem&burning)</p>
                                        <p>20% to <ModelAddress href='https://bscscan.com/address/0xbe5803497c13B932399244bCD09c425f7AB2Dfc5'>0xbe5803497c13B932399244bCD09c425f7AB2Dfc5</ModelAddress>(Founding team)</p>
                                        <p>20% to <ModelAddress href='https://bscscan.com/address/0x68fe7967b84f2e3aD15620cB03bA51E36a547Df7'>0x68fe7967b84f2e3aD15620cB03bA51E36a547Df7</ModelAddress>(Community Ecology Building Fund)</p>
                                        <p>10% to <ModelAddress href='https://bscscan.com/address/0x1A276a0bd3E39dd6C005b9AD95216335199238aC'>0x1A276a0bd3E39dd6C005b9AD95216335199238aC</ModelAddress>(allocation address for collecting a set of NFT playing cards)</p>
                                        <p>20% allocated by the mine owner, the contract is automatically executed</p>
                                        <br />
                                    </div>
                                </div>
                            </div>
                        </ContentText> : <ContentText>
                            <div className="outer-container">
                                <div className="inner-container">
                                    <div className="content">
                                        <p>PokerFi世界的各位玩家，随着PokerFi的正式上线及首批卡牌发售，整个星球的经济系统已经正式开启运转，现将涉及经济体系运转的核心共识合约地址进行公示，方便大家了解整个经济系统的运行状况以及监督每一笔开支的合理性，具体合约地址如下：</p>
                                        <ModelAddress href='https://bscscan.com/address/0x89Aba1453f58aB08056DA973163A67EFed95A432'>PK：0x89Aba1453f58aB08056DA973163A67EFed95A432</ModelAddress> <br />
                                        <ModelAddress href='https://bscscan.com/address/0xF61b203B7FF3be1D6a53f902d5CbC3e508Fa728F'>PK_1：0xF61b203B7FF3be1D6a53f902d5CbC3e508Fa728F</ModelAddress>
                                        <br />
                                        <br />
                                        <p>Poker (NFT 资产合约)：<ModelAddress href='https://bscscan.com/address/0x3DDECfa3E7D4Ff87DD6533095F47F01E71Cc14fe'>0x3DDECfa3E7D4Ff87DD6533095F47F01E71Cc14fe</ModelAddress></p>
                                        <p>CardMarket (卡牌交易合约)：<ModelAddress href='https://bscscan.com/address/0x1DBE23A144b74A2C157Dd9d74d66c39102bBa4A4'>0x1DBE23A144b74A2C157Dd9d74d66c39102bBa4A4</ModelAddress></p>
                                        <p>SlotStore (卡槽销售合约)：<ModelAddress href='https://bscscan.com/address/0x6200266D5e9fd8226D496036c475BB350a3232c4'>0x6200266D5e9fd8226D496036c475BB350a3232c4</ModelAddress></p>
                                        <p>CardStore (卡牌销售合约)：<ModelAddress href='https://bscscan.com/address/0x471AfCB0923796D33922785915E09469970D1D10'>0x471AfCB0923796D33922785915E09469970D1D10</ModelAddress></p>
                                        <p>MiningPool (矿池合约)：<ModelAddress href='https://bscscan.com/address/0x9c93e6100183235999A3085Af48C8b2945A4e9A2'>0x9c93e6100183235999A3085Af48C8b2945A4e9A2</ModelAddress></p>
                                        <p>JokerActivate (特殊 NFT 资产合约)：<ModelAddress href='https://bscscan.com/address/0x9c93e6100183235999A3085Af48C8b2945A4e9A2'>0x9c93e6100183235999A3085Af48C8b2945A4e9A2</ModelAddress></p>
                                        <br />
                                        <p>【卡槽销售接收合约】</p>
                                        <p><ModelAddress href='https://bscscan.com/address/0x587fcAbB403f617c965637870db5514d40856e4c'>0x587fcAbB403f617c965637870db5514d40856e4c</ModelAddress>（智能合约）</p>
                                        <p><ModelAddress href='https://bscscan.com/address/0x4a2AeD8b592ef42a5bc30278310842f5D2334C68'>0x4a2AeD8b592ef42a5bc30278310842f5D2334C68</ModelAddress>（接收卡槽销售的地址）</p>
                                        <p>50% 到<ModelAddress href='https://bscscan.com/address/0x68fe7967b84f2e3aD15620cB03bA51E36a547Df7'>0x68fe7967b84f2e3aD15620cB03bA51E36a547Df7</ModelAddress>（社区生态建设基金）</p>
                                        <p>50% 用于销毁，留存于<ModelAddress href='https://bscscan.com/address/0x587fcAbB403f617c965637870db5514d40856e4c '>0x587fcAbB403f617c965637870db5514d40856e4c </ModelAddress>（由签名发起事件，且只能用于销毁，合约自动执行）</p>
                                        <br />
                                        <p>【卡牌销售接收合约】</p>
                                        <p><ModelAddress href='https://bscscan.com/address/0x587fcAbB403f617c965637870db5514d40856e4c'>0x76000F17fD34a1cB1Ccd78DF89F89fE1319CAca0</ModelAddress></p>
                                        <p><ModelAddress href='https://bscscan.com/address/0x2f67250fC4eF41689E98931e4D2927E7665a0329'>0x2f67250fC4eF41689E98931e4D2927E7665a0329</ModelAddress></p>
                                        <p>70% 到<ModelAddress href='https://bscscan.com/address/0x92cE18117DA27c5B7A409F08800D0Ad2cB961138 '>0x92cE18117DA27c5B7A409F08800D0Ad2cB961138 </ModelAddress>（由签名发起事件，且只能用于二级市场PK币回购销毁）</p>
                                        <p>30%用于添加流动性支持的留存在<ModelAddress href='https://bscscan.com/address/0x76000F17fD34a1cB1Ccd78DF89F89fE1319CAca0 '>0x76000F17fD34a1cB1Ccd78DF89F89fE1319CAca0 </ModelAddress>（由签名发起事件，且只能用于增加流动性，合约自动执行）</p>
                                        <br />
                                        <p>【NFT卡牌交易手续费接收合约】</p>
                                        <p><ModelAddress href='https://bscscan.com/address/0xA883795C2fa5D62d8517702fdc45fAAe811DE8de'>0xA883795C2fa5D62d8517702fdc45fAAe811DE8de</ModelAddress></p>
                                        <br />
                                        <p>【能量费分配逻辑合约地址】</p>
                                        <p><ModelAddress href='https://bscscan.com/address/0xA883795C2fa5D62d8517702fdc45fAAe811DE8de'>0x5772e1Cdb6D6240c581792303189851e612c21f1</ModelAddress>(由签名发起事件，且只能按照合约逻辑向指定地址分配)</p>
                                        <p>30% 到 <ModelAddress href='https://bscscan.com/address/0xdEA2284928a4B56C4c1C55B8e772cd0523BC923E'>0xdEA2284928a4B56C4c1C55B8e772cd0523BC923E</ModelAddress>(由签名发起事件，专项用于二级市场PK币回购销毁)</p>
                                        <p>20% 到 <ModelAddress href='https://bscscan.com/address/0xbe5803497c13B932399244bCD09c425f7AB2Dfc5'>0xbe5803497c13B932399244bCD09c425f7AB2Dfc5</ModelAddress>(创世团队)</p>
                                        <p>20% 到<ModelAddress href='https://bscscan.com/address/0x68fe7967b84f2e3aD15620cB03bA51E36a547Df7'>0x68fe7967b84f2e3aD15620cB03bA51E36a547Df7</ModelAddress>(社区生态建设基金)</p>
                                        <p>10% 到<ModelAddress href='https://bscscan.com/address/0x1A276a0bd3E39dd6C005b9AD95216335199238aC'>0x1A276a0bd3E39dd6C005b9AD95216335199238aC</ModelAddress>(集齐一套NFT扑克牌的分配地址)</p>
                                        <p>20% 矿场所有人分配，合约自动执行</p>
                                        <br />
                                    </div>
                                </div>
                            </div>
                        </ContentText>
                        }
                    </ModelInfo>
                </ModelStyles>
            }
        </PublicWapper>
        <BaseColorBg />
        <AppBottom link="/public" />
        </div>
    )
}
