export PATH=/home/linuxbrew/.linuxbrew/bin:$PATH
rm -rf fe-notion
git clone https://github.com/NotionTeam02/fe-notion.git
cd fe-notion/server
git checkout dev
npm install
npx tsc