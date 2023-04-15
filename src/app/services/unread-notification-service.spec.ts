import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found-error';
import { makeNotification } from '@test/factories/notification-factory';
import { UnreadNotification } from './unread-notification-service';
import { Notification } from '@app/entities/notification/notification';

let notificationsRepository: InMemoryNotificationsRepository;
let sut: UnreadNotification;
let notification: Notification;

describe('Unread notification', () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    sut = new UnreadNotification(notificationsRepository);

    notification = makeNotification({
      readAt: new Date(),
    });

    notificationsRepository.create(notification);
  });

  it('should be able to unread a notification', async () => {
    await sut.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a non existing notification', async () => {
    await expect(() => {
      return sut.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
