from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models.model import db
from models.users import User

bp = Blueprint('routes', __name__)

@bp.route('/login', methods=['POST'])
def login():
    if request.json == None:
        return jsonify({"message": "Provide needed infomation"}), 400

    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if email == None or password == None:
        return jsonify({"message": "Missing required fields"}), 400
    
    user = User.query.filter_by(email_address=email).first()
    if not user or not user.verify_password(password):
        return jsonify({"message": "Invalid credentials"}), 401

    access_token = create_access_token(identity=user.id)

    return jsonify({"token": access_token}), 200


@bp.route('/signup', methods=['POST'])
def signup():
    if request.json == None:
        return jsonify({"message": "Provide needed infomation"}), 400
    
    first_name = request.json.get("first_name", None)
    last_name = request.json.get("last_name", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if first_name == None or last_name == None or email == None or password == None:
        return jsonify({"message": "Missing required fields"}), 400
    
    existing_user = User.query.filter_by(email_address=email).first()
    if existing_user:
        return jsonify({"message": "User with this email address already exists"}), 409

    new_user = User(first_name=first_name, last_name=last_name, email_address=email, password=password)
    new_user.set_password(password)

    try:
        db.session.add(new_user)
        db.session.commit()
        access_token = create_access_token(identity=new_user.id)
        return jsonify({'token' : access_token}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@bp.route('/logout', methods=['POST'])
def logout():
    return 'logging out'