"""empty message

Revision ID: 703f36581690
Revises: 
Create Date: 2024-12-20 13:47:01.760644

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '703f36581690'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users_table',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('phone', sa.String(), nullable=False),
    sa.Column('password_hash', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('name'),
    sa.UniqueConstraint('phone')
    )
    op.create_table('goals_table',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('start_date', sa.Date(), nullable=True),
    sa.Column('end_date', sa.Date(), nullable=True),
    sa.Column('metric_unit', sa.String(), nullable=True),
    sa.Column('update_frequency', sa.String(), nullable=True),
    sa.Column('goal_target', sa.String(), nullable=True),
    sa.Column('alert_time', sa.Time(), nullable=True),
    sa.Column('phone_alert', sa.Boolean(), nullable=True),
    sa.Column('email_alert', sa.Boolean(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users_table.id'], name=op.f('fk_goals_table_user_id_users_table')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('preference_table',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('commitment_time', sa.String(), nullable=True),
    sa.Column('career_path', sa.String(), nullable=True),
    sa.Column('avatar', sa.String(), nullable=True),
    sa.Column('mood', sa.String(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users_table.id'], name=op.f('fk_preference_table_user_id_users_table')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('progress_update_table',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('date', sa.Date(), nullable=False),
    sa.Column('metric_value', sa.String(), nullable=False),
    sa.Column('notes', sa.Text(), nullable=True),
    sa.Column('goal_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['goal_id'], ['goals_table.id'], name=op.f('fk_progress_update_table_goal_id_goals_table')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('progress_update_table')
    op.drop_table('preference_table')
    op.drop_table('goals_table')
    op.drop_table('users_table')
    # ### end Alembic commands ###
