import joblib
from sklearn.ensemble import IsolationForest

class MLDetector:
    def __init__(self, model_path):
        self.model = joblib.load(model_path)
        
    def predict(self, features):
        return self.model.decision_function([features])
