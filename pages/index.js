import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Head from 'next/head'
import Post from '../components/Post'
import {sortByDate} from '../utils/index'

//can this do anything but itself?
export default function Home({posts}) {
  // console.log(posts);
  return (
    <div>
    <Head>
      <title>A good title</title>
    </Head>
    <div className="posts">
      {posts.map((post, index) => (
        <Post key={index} post={post} />
        // <h3>{post.frontmatter.title}</h3>
      ))}
    </div>
    </div>
  )
}

//fetches data at build time ...allows us to build static site
export async function getStaticProps() {
  //data can come from anywhere-headless cms, strapi, sanityio
  //getStaticProps runs on the server side at build time
  //gets files from the posts dir
  const files = fs.readdirSync(path.join('posts'))
  //console.log(files);
  //get slug and frontmatter from posts
  const posts = files.map(filename => {
    //create slug
    const slug = filename.replace('.md', '')

    //get frontmatter as well
    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')
    // console.log(markdownWithMeta);
    const {data: frontmatter} = matter(markdownWithMeta)

    return {
      slug,
      frontmatter,
    }

  })

  // console.log(posts);


  return {
    props: {
      posts: posts.sort(sortByDate),
    }

  }

}
