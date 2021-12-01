import React from 'react';
import UserCircle from "../../../users/UserCircle";
import BoardSidebarUser from "./BoardSidebarUser";

const BoardSidebarUsers = (props) => {
    const {
        users,
        className,
        isOwner,
        boardId
    } = props

    return (
        <div className={className}>
            { isOwner &&
                <>
                    <div className="mb-2">
                        <h5>Workspace users</h5>
                        <div className="d-flex flex-wrap">
                            { users?.workspace_users?.map(user => <UserCircle key={user.id} className={'me-2'} user={user} />) }
                        </div>
                    </div>

                    { users?.board_users?.length !== 0 &&
                        <div className="">
                            <h5>Board users</h5>
                            <div className="d-flex flex-wrap">
                                { users?.board_users?.map(user => <BoardSidebarUser key={user.id} boardId={boardId} isOwner={isOwner} user={user} />) }
                            </div>
                        </div>
                    }
                </>
            }

            { !isOwner &&
                <>
                    <div className="mb-2">
                        <h5>Users</h5>
                        <div className="d-flex flex-wrap">
                            { users?.all_users?.map(user => <UserCircle key={user.id} className={'me-2'} user={user} />) }
                        </div>
                    </div>
                </>
            }

        </div>
    );
};

export default BoardSidebarUsers;
