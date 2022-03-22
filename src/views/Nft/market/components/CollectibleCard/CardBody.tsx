import { useMemo } from 'react'
import { CardBody, Flex, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useBNBBusdPrice } from 'hooks/useBUSDPrice'
import PreviewImage from './PreviewImage'
import { CollectibleCardProps } from './types'
import NFTMedia from '../NFTMedia'
import { CostLabel } from './styles'

const CollectibleCardBody: React.FC<CollectibleCardProps> = ({ nft, nftLocation, currentAskPrice, isUserNft }) => {
  const { name, attributes } = nft
  const bnbBusdPrice = useBNBBusdPrice()
  
  const type = useMemo(() => {
    const { value } = attributes.find(({ traitType }) => traitType === "Type") || { value: 'common'}
    return String(value).toLowerCase()
  }, [attributes])

  const star = useMemo(() => {
    const { value } = attributes.find(({ traitType }) => traitType === "Star") || { value: '1'}
    return String(value).toLowerCase()
  }, [attributes])

  return (
    <NftCard p="8px" type={type}>
      <NFTMedia as={PreviewImage} nft={nft} height={320} width={320} mb="8px" borderRadius="8px" />
      <img className="star" src={`/images/nfts/star-${star}.png`} alt="star" />
      <Flex className="name" justifyContent="center" width="100%" flexDirection="column" alignItems="center" height="42px">
        {currentAskPrice && <CostLabel cost={currentAskPrice} bnbBusdPrice={bnbBusdPrice} />}
        <Text as="p" fontSize={currentAskPrice ? "11px" : "16px"} fontFamily="shark-game">
          {name}
        </Text>
      </Flex>
    </NftCard>
  )
}

const NftCard = styled(CardBody)<{type: string}>`
  background: ${({ type }) => `url('/images/nfts/${type}.png')`};
  background-size: contain;
  background-repeat: no-repeat;
  position: relative;
  padding: 0px;
  aspect-ratio: 2/2.4;
  .name {
    position: absolute;
    bottom: 42px;
  }
  .star {
    position: absolute;
    top: 23px;
    width: 44px;
    right: 32px;
  }
`

export default CollectibleCardBody
