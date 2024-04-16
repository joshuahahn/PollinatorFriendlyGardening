from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/quiz')
def quiz():
    return render_template('quiz.html')

@app.route('/submit_quiz', methods=['POST'])
def submit_quiz():
    # Process the quiz results here
    results = request.json
    print(results)  # You can store the results in a database or file
    return jsonify({'message': 'Quiz results received!'})

if __name__ == '__main__':
    app.run(debug=False, port=5555)
