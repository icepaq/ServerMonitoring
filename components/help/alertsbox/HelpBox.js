import Styles from "../../../styles/Help.module.css";

export default function helpbox() {
    return (
        <div className={Styles.alertsBox}>
            <h2 className={Styles.title}>Data API Setup</h2>
            <p className={Styles.information}>
                The Data API allows you to see CPU and RAM usage for your
                server. This setup requires access to the terminal. <br />
                You can view the source code to the Data API here and modify it
                if you wish. These instruction are made for debian distributions <br />
                of linux, but should work on any linux distribution. The only
                difference being the install command.
            </p>
            <br />
            <h3 className={Styles.information}>Download Packages</h3>
            <p className={Styles.information}>
                Update any current packages
            </p>
            <div className={Styles.codes}>
                sudo apt-get update
            </div>

            <p className={Styles.information}>
                Install Java
            </p>
            <div className={Styles.codes}>
                sudo apt-get install default-jre
            </div>
            <div className={Styles.codes}>
                sudo apt-get install default-jdk
            </div>

            <p className={Styles.information}>
                Install Git
            </p>
            <div className={Styles.codes}>
                sudo apt-get install git
            </div>

            <p className={Styles.information}>
                Install Docker. Uses Docker's Official <a  className={Styles.whitelink} href="https://docs.docker.com/engine/installation/linux/ubuntulinux/">Convenience Script</a>
            </p>
            <div className={Styles.codes}>
                curl -fsSL https://get.docker.com -o get-docker.sh
            </div>
            <div className={Styles.codes}>
                sh ./get-docker.sh
            </div>

            <p className={Styles.information}>
                Download the Data API
            </p>
            <div className={Styles.codes}>
                git clone https://github.com/icepaq/Serverpanel-RunCommand.git
            </div>

            <h3 className={Styles.information}>Run and Build</h3>
            <p className={Styles.information}>
                Run MySQL
            </p>
            <div className={Styles.codes}>
                sudo docker run -p 3306:3306 -v /var/lib/runcommand/mysql:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=YOURPASSWORDHERE -d mysql:8.0
            </div>

            <p className={Styles.information}>
                Next we need to set the MySQL password. Open the Codes.java file and modify line 7 and set the db_password to what you set MYSQL_ROOT_PASSWORD to.
            </p>
            <div className={Styles.codes}>
                nano Serverpanel-RunCommand/src/main/java/com/icepaq/ServerManagementAPIEndpoint/Codes.java
            </div>
            <p className={Styles.information}>
                To save, press Ctrl+O and then the Enter button.
            </p>

            <p className={Styles.information}>
                Run Data API. Ensure that port 8084 is open.
            </p>
            <div className={Styles.codes}>
                cd Serverpanel-RunCommand
            </div>
            <div className={Styles.codes}>
                chmod +x mvnw
            </div>
            <div className={Styles.codes}>
                nohup sudo ./mvnw spring-boot:run &
            </div>

            <p className={Styles.information}>
                Add your server in this panel then go to the API Keys page and press "regenerate".
            </p>
        </div>
    );
}
