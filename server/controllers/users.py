from flask import Blueprint
from models.model import db

bp = Blueprint('routes', __name__)

@bp.route('/login', methods=['POST'])
def login():
    print('logging in')
    return 'logging in'

@bp.route('/signup', methods=['POST'])
def signup():
    print('signing up')
    return 'signing up'

@bp.route('/logout', methods=['POST'])
def logout():
    print('logging out')
    return 'logging out'