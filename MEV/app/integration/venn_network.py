import requests

class VennNetworkIntegrator:
    ALERT_TYPES = {
        "CONFIRMED_ATTACK": 0x1,
        "SUSPICIOUS_PATTERN": 0x2
    }

    def __init__(self, venn_node_url):
        self.venn_client = requests.Session()
        self.venn_client.base_url = venn_node_url

    def submit_alert(self, detection_data):
        """
        Submits sandwich attack alert to Venn Network.
        
        Args:
            detection_data (dict): Contains details of detected attack.
                Example:
                {
                    "attacker": "0x123...",
                    "victim": "0x456...",
                    "attacker_txs": ["0xabc...", "0xdef..."],
                    "victim_tx": "0xghi...",
                    "profit_estimate": 0.5,
                    "confidence_score": 0.95,
                    "block_number": 12345678
                }
        
        Returns:
            str: Response from Venn Network API.
        """
       
        alert_payload = {
            "chain_id": detection_data.get("chain_id", 1), 
            "alert_type": self.ALERT_TYPES["CONFIRMED_ATTACK"],
            "payload": {
                "attacker_address": detection_data["attacker"],
                "victim_address": detection_data["victim"],
                "attacker_transactions": detection_data["attacker_txs"],
                "victim_transaction": detection_data["victim_tx"],
                "profit_estimate_eth": detection_data["profit_estimate"],
                "confidence_score": detection_data["confidence_score"],
                "block_number": detection_data["block_number"]
            }
        }
        required_fields = ["attacker", "victim", "attacker_txs", "victim_tx", 
                           "profit_estimate", "confidence_score", "block_number"]
        for field in required_fields:
            if field not in detection_data or not detection_data[field]:
                raise ValueError(f"Missing required field: {field}")

        
        try:
            response = self.venn_client.post(f"{self.venn_client.base_url}/alerts", json=alert_payload)
            response.raise_for_status()  
            return response.json()  
        except requests.exceptions.RequestException as e:
            print(f"Error submitting alert: {e}")
            return {"status": "error", "message": str(e)}
