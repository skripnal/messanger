import React, { FC } from 'react'
import { FallingLines } from 'react-loader-spinner'
import styles from './Loader.module.css'

const Loader: FC = () => {
    return (
        <div className={styles.loaderContainer}>
            <FallingLines color="#4fa94d" width="100" visible={true} />
        </div>
    )
}

export default Loader
