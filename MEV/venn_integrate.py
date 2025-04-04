def integrate_with_venn(detector, venn_node):
    def new_block_callback(block_hash):
        block = venn_node.eth.get_block(block_hash)
        attacks = detector.analyze_block(block.number)
        
        for attack in attacks:
            venn_node.submit_alert({
                'type': 'sandwich_attack',
                'data': attack,
                'confidence': 0.95  # From paper results
            })
    
    venn_node.subscribe_new_blocks(new_block_callback)
