CREATE TABLE `user` (
  `user_id` varchar(225) NOT NULL,
  `username` varchar(225) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_type` varchar(255) DEFAULT NULL
)

ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

CREATE TABLE `sentences` (
  `sentence_id` int NOT NULL,
  `sentence_type` varchar(255) NOT NULL,
  `chapter` varchar(255) NOT NULL,
  `sentence` varchar(255) NOT NULL
)

ALTER TABLE `sentences`
  ADD PRIMARY KEY (`sentence_id`);

ALTER TABLE `sentences`
  MODIFY `sentence_id` int NOT NULL AUTO_INCREMENT;

CREATE TABLE `complition_logs` (
  `log_id` int NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `sentence_id` int DEFAULT NULL,
  `completed` boolean NOT NULL DEFAULT FALSE,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
)

ALTER TABLE `complition_logs`
  ADD PRIMARY KEY (`log_id`);

ALTER TABLE `complition_logs`
  MODIFY `log_id` int NOT NULL AUTO_INCREMENT;

ALTER TABLE `complition_logs`
  ADD CONSTRAINT `complition_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `complition_logs_ibfk_2` FOREIGN KEY (`sentence_id`) REFERENCES `sentences` (`sentence_id`);