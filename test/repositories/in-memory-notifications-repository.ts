import { Notification } from '@app/entities/notification/notification';
import { NotificationsRepository } from '@app/repositories/notification-repository';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = [];

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (item) => item.id == notificationId,
    );

    if (!notification) {
      return null;
    }

    return notification;
  }

  async create(notification: Notification) {
    this.notifications.push(notification);
  }

  async save(notification: Notification) {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id == notification.id,
    );

    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }
  }
}
