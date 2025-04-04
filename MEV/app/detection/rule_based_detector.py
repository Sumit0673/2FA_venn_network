class RuleBasedDetector:
    def __init__(self):
        self.rules = [
            self._is_sandwich_pattern,
            self._check_gas_price_differential
        ]
        
    def evaluate(self, tx_triplet):
        for rule in self.rules:
            if not rule(tx_triplet):
                return False
        return True

    def _is_sandwich_pattern(self, tx_triplet):
        # Implement logic to check if transactions form a sandwich pattern
        pass

    def _check_gas_price_differential(self, tx_triplet):
        # Implement logic to check gas price differences
        pass
