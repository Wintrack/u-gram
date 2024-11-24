-- CreateTable
CREATE TABLE "_likedByUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_likedByUsers_AB_unique" ON "_likedByUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_likedByUsers_B_index" ON "_likedByUsers"("B");

-- AddForeignKey
ALTER TABLE "_likedByUsers" ADD CONSTRAINT "_likedByUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Picture"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likedByUsers" ADD CONSTRAINT "_likedByUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
