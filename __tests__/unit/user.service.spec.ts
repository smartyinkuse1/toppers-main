import { UserService } from '../../src/services/user';
import { UserDatasourceInterface } from '../../src/models/interfaces/user.interface';

describe("UserService", () => {
  it("should findAll", () => {
    const Mock = jest.fn<UserDatasourceInterface, []>(() => ({
      findAll: jest.fn(),
      create: jest.fn(),
      findAllByIds: jest.fn(),
      findOneById: jest.fn(),
      findOneByEmail: jest.fn(),
      findOneByQuery: jest.fn(),
      update: jest.fn(),
      updateById: jest.fn(),
    }));
    const mock = new Mock();
    const instance = new UserService(mock);
    instance.getUsersQuery();

    expect(mock.findAll).toHaveBeenCalled();
  });
});