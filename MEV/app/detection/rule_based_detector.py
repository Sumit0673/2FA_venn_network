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
        return (tx_triplet[0]['from'] == tx_triplet[2]['from'] and 
                tx_triplet[1]['to'] == tx_triplet[0]['to'] and
                tx_triplet[0]['input'].startswith('0x') and 
                tx_triplet[2]['input'].startswith('0x'))

    def _check_gas_price_differential(self, tx_triplet):
        attacker1_gas = tx_triplet[0]['gasPrice']
        victim = tx_triplet[1]['gasPrice']
        attacker2_gas = tx_triplet[2]['gasPrice']


        Min_Premium = 1.1
        Max_Diff = 1.5

        frontRun_condition = (attacker1_gas >= victim * Min_Premium)
        BackRun_condition = (attacker2_gas >= victim * Min_Premium)

        consistency_condition = (abs(attacker1_gas - attacker2_gas)/attacker1_gas <= Max_Diff)

        return frontRun_condition and BackRun_condition and consistency_condition
