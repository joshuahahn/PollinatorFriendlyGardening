from flask import Flask, render_template, request, jsonify

from utils import QUIZ_PARAMS
learningmodulesdata = {
    "1": {
        "id": 1,
        "title": "Learn 1",
        "completed": "false",
    },
        "2": {
        "id": 2,
        "title": "Learn 2",
        "completed": "false",
    },
        "3": {
        "id": 3,
        "title": "Learn 3",
        "completed": "false",
    },
        "4": {
        "id": 4,
        "title": "Learn 4",
        "completed": "false",
    },
}

#When done with lesson four, change this variable to true.
allModulesComplete = False

app = Flask(__name__)
data = QUIZ_PARAMS["easy"] # default to easy mode

@app.route('/')
def index():
    return render_template('index.html', data=allModulesComplete)

@app.route('/learningmodules')
def learningmodules():
    print(learningmodules)
    print(type(learningmodules))
    return render_template('learningmodules.html', data=learningmodulesdata)

@app.route('/learn/<id>')
def learn(id):
    return render_template('learn.html', data=[id])

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/quiz/<int:qn>')
def quiz(qn):
    plant_name = data[qn]["name"]
    img_url = data[qn]["url"]
    plant_label = data[qn]["gt"]
    nxt_id = data[qn]["nxt_id"]
    return render_template('quiz.html', plant_name=plant_name, img_url=img_url, plant_label=plant_label, nxt_id=nxt_id)

@app.route('/quiz/<string:qn>')
def quiz_string(qn):
    if qn == "submit": return render_template('quiz_submit.html', score=2, quiz_length=len(data))
    return "oh no!"

@app.route('/submit_quiz', methods=['POST'])
def submit_quiz():
    results = request.json
    print(results)
    return jsonify({'message': 'Quiz results received!'})

if __name__ == '__main__':
    app.run(debug=False, port=5555)
