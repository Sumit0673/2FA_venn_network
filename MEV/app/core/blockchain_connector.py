from web3 import Web3
from web3.middleware import geth_poa_middleware

class BlockchainManager:
    def __init__(self, provider_url):
        self.w3 = Web3(Web3.HTTPProvider(provider_url))
        self.w3.middleware_onion.inject(geth_poa_middleware, layer=0)
        
    def stream_blocks(self):
        """Real-time block streaming with transaction analysis"""
        latest_block = self.w3.eth.block_number
        return self.w3.eth.subscribe("newHeads")

    def get_block(self, block_number):
        return self.w3.eth.get_block(block_number, full_transactions=True)
