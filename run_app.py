from app.core.config import ConfigLoader
from app.services.detection_service import DetectionService
from app.core.blockchain_connector import BlockchainManager

if __name__ == "__main__":
    config = ConfigLoader.load(".env")
    blockchain = BlockchainManager(config["ETH_PROVIDER_URL"])
    service = DetectionService(blockchain)
    service.start_monitoring()

