-- CreateTable
CREATE TABLE "List" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "listName" TEXT NOT NULL,
    "fullPath" TEXT NOT NULL,
    CONSTRAINT "Book_listName_fkey" FOREIGN KEY ("listName") REFERENCES "List" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "List_name_key" ON "List"("name");
