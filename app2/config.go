// ChainConfig is the core config which determines the blockchain settings.
//
// ChainConfig is stored in the database on a per block basis. 
// This means that any network, identified by its genesis block, 
// can have its own set of configuration options.
type ChainConfig struct {
    ChainId *big.Int 'json:"chainId"' // Chain id identifies the current chain and is used for replay protection
    HomesteadBlock *big.Int 'json:"homesteadBlock,omitempty"' // Homestead switch block (nil = no fork, 0 = already homestead)
    DAOForkBlock *big.Int 'json:"daoForkBlock,omitempty"' // TheDAO hard-fork switch block (nil = no fork)
    DAOForkSupport bool 'json:"daoForkSupport,omitempty"' // Whether the nodes supports or opposes the DAO hard-fork
    // EIP150 implements the Gas price changes (https://github.com/ethereum/EIPs/issues/150)
    EIP150Block *big.Int 'json:"eip150Block,omitempty"' // EIP150 HF block (nil = no fork)
    EIP150Hash common.Hash 'json:"eip150Hash,omitempty"' // EIP150 HF hash (fast sync aid)
    EIP155Block *big.Int 'json:"eip155Block,omitempty"' // EIP155 HF block
    EIP158Block *big.Int 'json:"eip158Block,omitempty"' // EIP158 HF block
    // Various consensus engines
    Ethash *EthashConfig 'json:"ethash,omitempty"'
    Clique *CliqueConfig 'json:"clique,omitempty"'
}