class AttackAnalyzer:
    def __init__(self, rule_based_detector, ml_detector):
        self.rule_based = rule_based_detector
        self.ml_detector = ml_detector
        
    def analyze(self, tx_triplet):
        rule_score = self.rule_based.evaluate(tx_triplet)
        ml_features = self._extract_features(tx_triplet)
        ml_score = self.ml_detector.predict(ml_features)
        return self._combine_scores(rule_score, ml_score)

    def extract_features(self, tx_triplet):

        attacker1_gas = tx_triplet[0]['gasPrice']
        victim_gas = tx_triplet[1]['gasPrice']
        attacker2_gas = tx_triplet[2]['gasPrice']
        
        gas_diff1 = attacker1_gas - victim_gas
        gas_diff2 = attacker2_gas - victim_gas
        
        timestamp_diff1 = tx_triplet[0]['timestamp'] - tx_triplet[1]['timestamp']
        timestamp_diff2 = tx_triplet[2]['timestamp'] - tx_triplet[1]['timestamp']
        
        return np.array([gas_diff1, gas_diff2, timestamp_diff1, timestamp_diff2])

    def _combine_scores(self, rule_score, ml_score):

        combined_score = 0.6 * rule_score + 0.4 * ml_score
        return combined_score if combined_score > 0.85 else 0

