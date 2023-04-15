import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notifications.controller';
import { SendNotification } from '@app/services/send-notification-service';
import { DatabaseModule } from '../database/database.module';
import { CancelNotification } from '@app/services/cancel-notification-service';
import { CountRecipientNotifications } from '@app/services/count-recipient-notifications-service';
import { GetRecipientNotifications } from '@app/services/get-recipient-notifications-service';
import { ReadNotification } from '@app/services/read-notification-service';
import { UnreadNotification } from '@app/services/unread-notification-service';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotifications,
    GetRecipientNotifications,
    ReadNotification,
    UnreadNotification,
  ],
})
export class HTTPModule {}
