import clsx from 'clsx'
import classes from './users-chip.module.css'
import {USER_CHIP_STATUS} from '../user-chip'

export interface User {
  first_name: string
  last_name: string
  work_email: string
  profile_img_url: string
  id: string
  middle_name?: string | null
}

interface UsersChipProps {
  status?: USER_CHIP_STATUS
  users: Array<User>
}

export function UsersChip({status = USER_CHIP_STATUS.DEFAULT, users}: UsersChipProps) {
  return users?.length > 0 ? (
    <div className={clsx(classes.userChipContainer, classes.nonZeroState, classes[status])}>
      <div className={classes.userChipImageContainer}>
        <img
          src={users[0].profile_img_url ? users[0].profile_img_url : ''}
          className={clsx(classes.profileImage, classes.firstImage)}
        />
        {users?.length > 1 && (
          <img
            src={users[1].profile_img_url ? users[1].profile_img_url : ''}
            className={clsx(classes.profileImage, classes.secondImage)}
          />
        )}
      </div>
      <div className={clsx(classes.userCount, 'zap-caption-semibold')}>{users.length}</div>
    </div>
  ) : (
    <div className={clsx(classes.userChipContainer, classes.zeroState, classes[status])}>
      <div className={clsx(classes.userCount, 'zap-caption-semibold')}>0</div>
    </div>
  )
}
