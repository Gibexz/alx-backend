#!/usr/bin/env python3
"""
module: 4-app.py
"""
from flask import Flask, render_template, request
from flask_babel import Babel


class Config:
    """bable config code"""
    LANGUAGES = ['en', 'fr']
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app)


@babel.localeselector
def get_locale():
    """
    auto language selector
    return request.accept_languages.best_match(app.config['LANGUAGES'])
    """
    locale = request.args.get('locale')
    if locale in app.config['LANGUAGES']:
        return locale

    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route("/")
def hello():
    """a basic flask route"""
    return render_template('4-index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
