-- CreateTable
CREATE TABLE `Capybara` (
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `age_years` INTEGER NOT NULL,
    `weight_kg` INTEGER NOT NULL,
    `health_status` VARCHAR(191) NOT NULL,
    `habitatId` CHAR(36) NULL,
    `behaviour` VARCHAR(191) NOT NULL,
    `diet` VARCHAR(191) NOT NULL,
    `observations` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Habitat` (
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Capybara` ADD CONSTRAINT `Capybara_habitatId_fkey` FOREIGN KEY (`habitatId`) REFERENCES `Habitat`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
