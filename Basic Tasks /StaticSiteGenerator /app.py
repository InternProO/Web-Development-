from flask import Flask, request, render_template, send_from_directory
import openai

app = Flask(__name__)
openai.api_key = 'YOUR_OPENAI_API_KEY'

@app.route('/')
def index():
    return render_template('base.html')

@app.route('/generate', methods=['POST'])
def generate():
    content = request.form['content']
    
    # AI-powered layout recommendation
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=f"Recommend an optimal layout for this content:\n\n{content}",
        max_tokens=150
    )
    layout = response.choices[0].text.strip()
    
    return render_template('layout.html', content=content, layout=layout)

@app.route('/static/<path:path>')
def static_files(path):
    return send_from_directory('static', path)

if __name__ == '__main__':
    app.run(debug=True)
