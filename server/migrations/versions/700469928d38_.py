"""empty message

Revision ID: 700469928d38
Revises: 78593caf0295
Create Date: 2023-11-05 11:54:32.729457

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '700469928d38'
down_revision = '78593caf0295'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('symb_to_user')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('symb_to_user',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('symbol', sa.VARCHAR(length=10), autoincrement=False, nullable=False),
    sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='symb_to_user_user_id_fkey'),
    sa.PrimaryKeyConstraint('id', name='symb_to_user_pkey')
    )
    # ### end Alembic commands ###
