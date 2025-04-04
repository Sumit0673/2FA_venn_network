import logging

def setup_logging(level=logging.INFO):
    logging.basicConfig(level=level)
    return logging.getLogger(__name__)

def calculate_profit(attack_tx, victim_tx):
    
    k = attack_tx.reserve0 * attack_tx.reserve1
    delta = victim_tx.amountIn * (1 - self.uniswap_fee)
    return (delta**2 * k) / (4 * (k + delta)**2)
