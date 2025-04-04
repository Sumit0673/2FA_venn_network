import os
from dotenv import load_dotenv

class ConfigLoader:
    @staticmethod
    def load(env_file=".env"):
        load_dotenv(env_file)
        return {
            "ETH_PROVIDER_URL": os.getenv("ETH_PROVIDER_URL"),
            "VENN_NODE_URL": os.getenv("VENN_NODE_URL"),
            "ML_MODEL_PATH": os.getenv("ML_MODEL_PATH")
        }
