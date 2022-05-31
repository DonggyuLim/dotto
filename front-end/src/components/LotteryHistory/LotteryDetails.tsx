import dateFormat from 'utils/dateFormat'
import { lotteryGameType } from 'types/lotteryTypes'
import LotteryTicket from 'components/LotteryTicket/LotteryTicket'
import LotteryTable from './LotteryTable'

// import Accordion from '@mui/material/Accordion'
// import AccordionSummary from '@mui/material/AccordionSummary'
// import AccordionDetails from '@mui/material/AccordionDetails'
// import Typography from '@mui/material/Typography'
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
// import Box from '@mui/material/Box'
interface LotteryDetailsProps {
  lotteryGame: lotteryGameType
}

const LotteryDetails = ({ lotteryGame }: LotteryDetailsProps) => {
  return (
    <></>
    // <Accordion>
    //   <AccordionSummary
    //     expandIcon={<ExpandMoreIcon />}
    //     aria-controls='game-accordion'
    //     id='game-accordion'
    //   >
    //     <Box
    //       sx={{
    //         display: 'flex',
    //         flexDirection: 'row',
    //         justifyContent: 'space-between',
    //         width: '100%',
    //         alignContent: 'center',
    //       }}
    //     >
    //       <Typography alignSelf={'center'}>DecentralLotto</Typography>
    //       <Box>
    //         <Typography>
    //           Price <strong>{lotteryGame.lotteryCost}.00 TORII</strong>
    //         </Typography>
    //         <Typography>
    //           Draw <strong>{dateFormat(lotteryGame.createdAt)}</strong>
    //         </Typography>
    //       </Box>
    //     </Box>
    //   </AccordionSummary>
    //   <AccordionDetails>
    //     <Typography margin={'1rem 0'}>Result</Typography>
    //     <LotteryTicket ticket={lotteryGame.resultLottery} />
    //     <Typography marginTop={'1rem'}>Your play lottery</Typography>
    //     <LotteryTable
    //       playLottery={lotteryGame.playLottery}
    //       resultLottery={lotteryGame.resultLottery}
    //     />
    //     <Typography sx={{ marginTop: '1rem' }}>
    //       <strong>Your Profit: {lotteryGame.win}.00 TORII</strong>
    //     </Typography>
    //   </AccordionDetails>
    // </Accordion>
  )
}

export default LotteryDetails
