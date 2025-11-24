-- CreateTable
CREATE TABLE `Spacecraft` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `launchDate` DATETIME(3) NOT NULL,
    `active` BOOLEAN NOT NULL,
    `crewCapacity` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mission` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `destination` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NULL,
    `spacecraftId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Astronaut` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `rank` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AstronautSkill` (
    `id` VARCHAR(191) NOT NULL,
    `skill` VARCHAR(191) NOT NULL,
    `astronautId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Experiment` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `field` VARCHAR(191) NOT NULL,
    `conductedOn` DATETIME(3) NOT NULL,
    `result` VARCHAR(191) NULL,
    `missionId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_MissionCrew` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_MissionCrew_AB_unique`(`A`, `B`),
    INDEX `_MissionCrew_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Mission` ADD CONSTRAINT `Mission_spacecraftId_fkey` FOREIGN KEY (`spacecraftId`) REFERENCES `Spacecraft`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AstronautSkill` ADD CONSTRAINT `AstronautSkill_astronautId_fkey` FOREIGN KEY (`astronautId`) REFERENCES `Astronaut`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Experiment` ADD CONSTRAINT `Experiment_missionId_fkey` FOREIGN KEY (`missionId`) REFERENCES `Mission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MissionCrew` ADD CONSTRAINT `_MissionCrew_A_fkey` FOREIGN KEY (`A`) REFERENCES `Astronaut`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MissionCrew` ADD CONSTRAINT `_MissionCrew_B_fkey` FOREIGN KEY (`B`) REFERENCES `Mission`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
