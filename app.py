from flask import Flask, render_template, request, jsonify

from utils import QUIZ_PARAMS

imgsrc = "/static/imgs/"
learningmodulesdata = {
    "1": {
        "id": 1,
        "title": "Learn 1: Bee Flowers",
        "completed": "false",
        "pairs": {
            "Dahlia": imgsrc + "bees/dahlia.Jpg",
            "Fennel": imgsrc + "bees/fennel.jpg",
            "Geranium": imgsrc + "bees/geranium.jpg",
            "Heliotrope": imgsrc + "bees/heliotrope.jpg",
        },
        "text": "Every good garden contains a diverse mix of flowers. Even better gardens attract a diverse mix of pollinators. In the following lessons, we will learn about what flowers attract which pollinators, starting with bee flowers!"
    },
    "2": {
        "id": 2,
        "title": "Learn 2: Bat Flowers",
        "completed": "false",
        "pairs": {
            "Goldenrod": imgsrc + "bats/goldenrod.jpg",
            "Narrow": imgsrc + "bats/narrow.jpeg",
            "Spotted Beebalm": imgsrc + "bats/spotted_beebalm.png",
            "Mango": imgsrc + "/bats/mango.jpg"
        },
        "text": "Next, we will learn about flowers that are pollinated by bats. Contrary to bee flowers that tend to bloom & become brighter in the day, bat flowers tend to be pale & nocturnal."
    },
    "3": {
        "id": 3,
        "title": "Learn 3: Butterfly Flowers",
        "completed": "false",
        "pairs": {
            "Mexican Petunia": imgsrc + "butterflies/mexican_petunia.jpg",
            "Milkweed": imgsrc + "butterflies/milkweed.jpg",
            "Passionflower": imgsrc + "butterflies/passionflower.jpeg",
            "Snapdragon": imgsrc + "butterflies/snapdragon.png"
        },
        "text": "Finally, we will learn about butterfly flowers. Like bee flowers, butterfly flowers tend to be brighter and bloom during the day. However, unlike bee flowers, butterfly flowers tend to be more flat, providing a landing space for the butterfly."
    }
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

@app.route('/learn/game<id>')
def learn_game(id):
    return render_template('learn.html', data=[id, learningmodulesdata])

@app.route('/completed', methods=['POST'])
def completed_quiz():
    completed_id = request.form['value']
    learningmodulesdata[completed_id]['completed'] = 'true'
    return learningmodulesdata

@app.route('/learn/<id>')
def learn(id):
    return render_template('learninfo.html', data=[id, learningmodulesdata])

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
    score = request.args.get('score')
    if qn == "submit":
        if score is not None:
            return render_template('quiz_submit.html', score=score, quiz_length=len(data))
        return "score parameter missing"
    return "oh no!"

@app.route('/submit_quiz', methods=['POST'])
def submit_quiz():
    results = request.json
    print(results)
    return jsonify({'message': 'Quiz results received!'})

if __name__ == '__main__':
    app.run(debug=False, port=5555)
