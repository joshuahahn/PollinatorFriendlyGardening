from flask import Flask, render_template, request, jsonify

from utils import QUIZ_PARAMS

app = Flask(__name__)
data = QUIZ_PARAMS["easy"] # default to easy mode

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/quiz/<int:qn>')
def quiz(qn):
    plant_name = data[qn]["name"]
    img_url = data[qn]["url"]
    plant_label = data[qn]["gt"]

    return render_template('quiz.html', plant_name=plant_name, img_url=img_url, plant_label=plant_label)

@app.route('/submit_quiz', methods=['POST'])
def submit_quiz():
    # Process the quiz results here
    results = request.json
    print(results)  # You can store the results in a database or file
    return jsonify({'message': 'Quiz results received!'})

if __name__ == '__main__':
    app.run(debug=False, port=5555)
