import unittest
from app.core.blockchain_connector import BlockchainManager

class TestBlockchainConnector(unittest.TestCase):
    def setUp(self):
        self.connector = BlockchainManager("wss://mainnet.infura.io/ws/v3/9481436c848e4ca79678468c1469fd71")

    def test_stream_blocks(self):
        # Test block streaming functionality
        pass

if __name__ == "__main__":
    unittest.main()
