<br /> <br /> <br />
{/* Some text */}
<Grid item xs {...animation}>
  <TextField
    placeholder="ContractAddress/TokenId"
    onKeyPress={onEnterPressAction}
    disabled={user.id === userId}
    label="Directly add NFT"
    size="small"
    fullWidth
  />
</Grid>
{/* Value */}
<Grid item xs="auto" {...animation}>
  <TextField
    InputProps={{
      endAdornment: (
        <Ethereum style={{ width: 18, height: 18 }} />
      ),
    }}
    label="Value"
    disabled={user.id === userId}
    type="number"
    size="small"
  />
</Grid>
{/* Send money */}
<Grid item xs={12} {...animation}>
  <TextField
    disabled={user.id !== userId}
    onChange={onPriceChange(user.id)}
    value={tradesDetails[user.id].trade}
    type="number"
    label="Send"
    size="small"
    InputProps={{
      endAdornment: (
        <Ethereum style={{ width: 18, height: 18 }} />
      ),
    }}
    inputProps={{ step: 0.1 }}
  />
</Grid>
{console.log(
  "tradesDetails[user.id].trade",
  tradesDetails[user.id].trade
)}
{/* Pay fees */}
<Grid item xs={12} {...animation}>
  <FormControlLabel
    control={
      <Checkbox
        // checked={trade.payOtherTraderFees}
        disabled={user.id !== userId}
        onChange={onCheckPayFees(user.id)}
      />
    }
    label="Pay fees of other trader too"
  />
</Grid>
{/* Pay fees */}
<Grid item xs={12} {...animation}>
  <Table>
    <TableBody>
      <TableRow>
        <TableCell variant="head">Fees of trade</TableCell>
        <TableCell variant="head" align="right">
          Unrefundable fees
        </TableCell>
        <TableCell>
          <Box display="flex">
            <Ethereum style={{ width: 18, height: 18 }} />
            &nbsp;
            <Typography fontWeight="bold">1</Typography>
          </Box>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</Grid>
{/* Trade buttons */}
{!(
  user.id !== userId &&
  tradesDetails[user.id].trade.tradeStatus ===
    TradeStatus.ACCEPTED
) && (
  <Grid item xs={12} {...animation}>
    <Grid container columnSpacing={2}>
      <Grid item xs={6}>
        <Button
          disabled={
            user.id !== userId ||
            tradesDetails[user.id].trade.tradeStatus ===
              TradeStatus.ACCEPTED ||
            dealClosed
          }
          onClick={changeTradeStatus(TradeStatus.ACCEPTED)}
          variant="contained"
          color="success"
          fullWidth
        >
          Accept Trade
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          disabled={
            user.id !== userId ||
            tradesDetails[user.id].trade.tradeStatus !==
              TradeStatus.ACCEPTED ||
            dealClosed
          }
          onClick={changeTradeStatus(TradeStatus.NONE)}
          variant="contained"
          color="error"
          fullWidth
        >
          Cancel Trade
        </Button>
      </Grid>
    </Grid>
  </Grid>
)}
{/* Trade accepted message */}
{user.id !== userId &&
  tradesDetails[user.id].trade.tradeStatus ===
    TradeStatus.ACCEPTED && (
    <Grid item xs={12}>
      <Alert severity="info">
        <Typography variant="body1">
          {user.name} has accepted the trade
        </Typography>
      </Alert>
    </Grid>
  )}
{/* Disclamer */}
<Grid item xs={12} {...animation}>
  <Typography>
    By accepting the trade, I accept the terms and conditions
    of NFT Buddy.
  </Typography>
</Grid>



      {/* <TraderView
                    userName={`${user.name}${
                      user.id === userId ? " (You)" : ""
                    }`}
                    canDragProducts={!dealClosed && user.id === userId}
                    products={tradesDetails[user.id].products}
                    trade={tradesDetails[user.id].trade}
                    isCurrentUser={user.id === userId}
                    dealClosed={dealClosed}
                    traderId={user.id}
                    canJoinTrade={canJoinTrade()}
                    onTradeStatusChange={onTradeStatusChange(user.id)}
                    onCheckPayFees={onCheckPayFees(user.id)}
                    onProductMove={onProductMove(user.id)}
                    onPriceChange={onPriceChange(user.id)}
                    onJoinTrade={onJoinTrade}
                  />
                 */}
                     