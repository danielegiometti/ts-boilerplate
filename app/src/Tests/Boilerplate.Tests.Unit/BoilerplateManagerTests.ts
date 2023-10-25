import 'reflect-metadata';
import { IMock, It, Mock, Times } from 'typemoq';
import BoilerplateManager from '../../Boilerplate.Domain/BoilerplateManager';
import ICalendar from '../../Boilerplate.Domain/Common/Interfaces/ICalendar';
import ILogger from '../../Boilerplate.Logging/Interfaces/ILogger';
import IBoilerPayload from '../../Boilerplate.Models/Interfaces/IBoilerPayload';
import ITodo from '../../Boilerplate.Models/Interfaces/ITodo';
import IBoilerplateRepository from '../../Boilerplate.Repositories/Interfaces/IBoilerplateRepository';
import toPromiseResponse from '../Boilerplate.Tests.Helpers/Utilities';

describe('BoilerplateManager Unit Tests', () => {
    let logger: IMock<ILogger>;
    let calendar: IMock<ICalendar>;
    let boilerplateRepository: IMock<IBoilerplateRepository>;

    beforeEach(() => {
        logger = Mock.ofType<ILogger>();
        calendar = Mock.ofType<ICalendar>();
        calendar.setup((x) => x.Now()).returns(() => new Date());
        boilerplateRepository = Mock.ofType<IBoilerplateRepository>();
    });

    it('Manage should call correct dependencies on happy path', async () => {
        // Arrange
        const todo = { completed: true, id: 1, title: 'title', userId: 1 } as ITodo;
        const payload = { prop1: 1, prop2: 'test' } as IBoilerPayload;
        boilerplateRepository.setup((x) => x.GetTodo(It.isAnyNumber())).returns(() => toPromiseResponse(todo));
        const sut = new BoilerplateManager(calendar.object, logger.object, boilerplateRepository.object);

        // Act
        await sut.Manage(payload);

        // Assert
        logger.verify((x) => x.LogInfo(It.isAnyString()), Times.once());
        logger.verify((x) => x.LogError(It.isAnyString()), Times.never());
        logger.verify((x) => x.LogException(It.isAny()), Times.never());
        calendar.verify((x) => x.Now(), Times.once());
        boilerplateRepository.verify((x) => x.GetTodo(It.isAnyNumber()), Times.once());
        boilerplateRepository.verify((x) => x.SendTodo(It.isAny()), Times.once());
    });

    it('Manage should call correct dependencies on exception', async () => {
        // Arrange
        const payload = { prop1: 1, prop2: 'test' } as IBoilerPayload;
        boilerplateRepository.setup((x) => x.GetTodo(It.isAnyNumber())).throws(new Error('error'));
        const sut = new BoilerplateManager(calendar.object, logger.object, boilerplateRepository.object);
        let wasCaught = false;

        // Act
        try {
            await sut.Manage(payload);
        } catch (e) {
            wasCaught = true;
        }

        // Assert
        expect(wasCaught).toBeTruthy();
        logger.verify((x) => x.LogInfo(It.isAnyString()), Times.once());
        logger.verify((x) => x.LogError(It.isAnyString()), Times.once());
        logger.verify((x) => x.LogException(It.isAny()), Times.once());
        calendar.verify((x) => x.Now(), Times.never());
        boilerplateRepository.verify((x) => x.GetTodo(It.isAnyNumber()), Times.once());
        boilerplateRepository.verify((x) => x.SendTodo(It.isAny()), Times.never());
    });
});
