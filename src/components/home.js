import React from 'react'

export default function home() {
    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}

// import Cube from "react-cube-navigation";
// import React from 'react'

// const images = [
//   "https://images.unsplash.com/photo-1565371557106-c2abcc6fb36a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
//   "https://images.unsplash.com/photo-1565361849078-294849288ced?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
//   "https://images.unsplash.com/photo-1565279799937-b397e6483124?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=619&q=80",
//   "https://images.unsplash.com/photo-1565264216052-3c9012481a1f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
//   "https://images.unsplash.com/photo-1565274952013-13cecde5c8b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
//   "https://images.unsplash.com/photo-1565287753977-e94d0227c640?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=633&q=80",
//   "https://images.unsplash.com/photo-1565340076861-7a6667b36072?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80",
//   "https://images.unsplash.com/photo-1565259901762-b8d797c6f887?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
// ];

// export default function Example() {
//   const [index, setIndex] = React.useState(0);

//   return (
//     <Cube
//       index={index}
//       onChange={i => setIndex(i)}
//       width={300}
//       height={600}
//       hasNext={i => i < images.length - 1}
//       renderItem={(i, active) => {
//         return (
//           <div
//             style={{
//               backgroundImage: `url(${images[i]})`,
//               backgroundSize: "cover",
//               flex: 1,
//               borderRadius: "1rem"
//             }}
//           />
//         );
//       }}
//     />
//   );
// }