"""Add comments

Revision ID: 88344de7722d
Revises: d9098e78eaea
Create Date: 2020-07-14 21:54:33.795834

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '88344de7722d'
down_revision = 'd9098e78eaea'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('comments',
    sa.Column('comment_id', sa.Integer(), nullable=False),
    sa.Column('post_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('comment_text', sa.Text(), nullable=True),
    sa.Column('comment_date', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['post_id'], ['posts.post_id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.user_id'], ),
    sa.PrimaryKeyConstraint('comment_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('comments')
    # ### end Alembic commands ###