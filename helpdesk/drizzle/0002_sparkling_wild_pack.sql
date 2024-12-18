PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_tickets` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text(60) NOT NULL,
	`order_id` text,
	`product_id` integer,
	`issue_type` text DEFAULT 'other' NOT NULL,
	`description` text,
	`status` text DEFAULT 'open' NOT NULL,
	`priority` text DEFAULT NULL,
	`created_by` text NOT NULL,
	`created_at` integer DEFAULT '"2024-12-18T14:19:10.178Z"' NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
INSERT INTO `__new_tickets`("id", "title", "order_id", "product_id", "issue_type", "description", "status", "priority", "created_by", "created_at", "updated_at") SELECT "id", "title", "order_id", "product_id", "issue_type", "description", "status", "priority", "created_by", "created_at", "updated_at" FROM `tickets`;--> statement-breakpoint
DROP TABLE `tickets`;--> statement-breakpoint
ALTER TABLE `__new_tickets` RENAME TO `tickets`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `issue_type_idx` ON `tickets` (`status`);--> statement-breakpoint
CREATE INDEX `status_idx` ON `tickets` (`status`);--> statement-breakpoint
CREATE INDEX `priority_idx` ON `tickets` (`priority`);--> statement-breakpoint
CREATE INDEX `created_by_idx` ON `tickets` (`created_by`);