import type React from "react"

export default function CommunityVoiceSection(): React.ReactElement {
  return (
    <section className="py-24 bg-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-amber-600 font-bold tracking-wide uppercase text-sm mb-3">Community Voices</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Student &amp; Parent Stories</h3>
          <div className="h-1 w-20 bg-amber-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-xl border-t-4 border-brand-900 hover:shadow-2xl transition-shadow duration-300 relative">
            <div className="absolute -top-4 left-8 w-8 h-8 bg-brand-900 flex items-center justify-center rounded-full text-white shadow-lg">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M14.017 21L14.017 18C14.017 16.0547 15.1924 14.6609 16.9189 13.9188C17.653 13.6025 18.2583 13.0645 18.7303 12.5939C16.9638 12.3929 16.143 11.42 16.0353 10.3708C15.823 8.30313 17.502 6.51688 19.5799 6.51688C21.0366 6.51688 22.25 7.64648 22.25 9.07188C22.25 13.0039 19.3496 17.1534 16.2736 19.7891C15.5898 20.375 14.6738 20.9125 14.017 21ZM4.0166 21L4.0166 18C4.0166 16.0547 5.19238 14.6609 6.91894 13.9188C7.65298 13.6025 8.25816 13.0645 8.73031 12.5939C6.96381 12.3929 6.14297 11.42 6.03531 10.3708C5.82297 8.30313 7.50195 6.51688 9.57988 6.51688C11.0366 6.51688 12.25 7.64648 12.25 9.07188C12.25 13.0039 9.34961 17.1534 6.27363 19.7891C5.58984 20.375 4.67383 20.9125 4.0166 21Z" />
              </svg>
            </div>
            <p className="text-stone-700 mb-6 italic leading-relaxed">
              "Sending our son to Thornhill High School was the best decision we've made. The balance between academics and character growth is unmatched."
            </p>
            <div className="flex items-center gap-4 pt-6 border-t border-stone-200">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                alt="Parent"
                className="w-12 h-12 rounded-full object-cover ring-4 ring-white"
              />
              <div>
                <p className="font-bold text-stone-900 text-sm">Priya Patel</p>
                <p className="text-stone-600 text-xs uppercase tracking-wide">Parent, Grade 10</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-xl border-t-4 border-amber-600 hover:shadow-2xl transition-shadow duration-300 relative">
            <div className="absolute -top-4 left-8 w-8 h-8 bg-amber-600 flex items-center justify-center rounded-full text-white shadow-lg">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M14.017 21L14.017 18C14.017 16.0547 15.1924 14.6609 16.9189 13.9188C17.653 13.6025 18.2583 13.0645 18.7303 12.5939C16.9638 12.3929 16.143 11.42 16.0353 10.3708C15.823 8.30313 17.502 6.51688 19.5799 6.51688C21.0366 6.51688 22.25 7.64648 22.25 9.07188C22.25 13.0039 19.3496 17.1534 16.2736 19.7891C15.5898 20.375 14.6738 20.9125 14.017 21ZM4.0166 21L4.0166 18C4.0166 16.0547 5.19238 14.6609 6.91894 13.9188C7.65298 13.6025 8.25816 13.0645 8.73031 12.5939C6.96381 12.3929 6.14297 11.42 6.03531 10.3708C5.82297 8.30313 7.50195 6.51688 9.57988 6.51688C11.0366 6.51688 12.25 7.64648 12.25 9.07188C12.25 13.0039 9.34961 17.1534 6.27363 19.7891C5.58984 20.375 4.67383 20.9125 4.0166 21Z" />
              </svg>
            </div>
            <p className="text-stone-700 mb-6 italic leading-relaxed">
              "The leadership opportunities here gave me the confidence to apply to Ivy League universities. I owe so much to my teachers."
            </p>
            <div className="flex items-center gap-4 pt-6 border-t border-stone-200">
              <img
                src="https://images.unsplash.com/photo-1542596594-649edbc13630?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                alt="Alumni"
                className="w-12 h-12 rounded-full object-cover ring-4 ring-white"
              />
              <div>
                <p className="font-bold text-stone-900 text-sm">David Chen</p>
                <p className="text-stone-600 text-xs uppercase tracking-wide">Alumni, Class of '20</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-xl border-t-4 border-brand-900 hover:shadow-2xl transition-shadow duration-300 relative">
            <div className="absolute -top-4 left-8 w-8 h-8 bg-brand-900 flex items-center justify-center rounded-full text-white shadow-lg">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M14.017 21L14.017 18C14.017 16.0547 15.1924 14.6609 16.9189 13.9188C17.653 13.6025 18.2583 13.0645 18.7303 12.5939C16.9638 12.3929 16.143 11.42 16.0353 10.3708C15.823 8.30313 17.502 6.51688 19.5799 6.51688C21.0366 6.51688 22.25 7.64648 22.25 9.07188C22.25 13.0039 19.3496 17.1534 16.2736 19.7891C15.5898 20.375 14.6738 20.9125 14.017 21ZM4.0166 21L4.0166 18C4.0166 16.0547 5.19238 14.6609 6.91894 13.9188C7.65298 13.6025 8.25816 13.0645 8.73031 12.5939C6.96381 12.3929 6.14297 11.42 6.03531 10.3708C5.82297 8.30313 7.50195 6.51688 9.57988 6.51688C11.0366 6.51688 12.25 7.64648 12.25 9.07188C12.25 13.0039 9.34961 17.1534 6.27363 19.7891C5.58984 20.375 4.67383 20.9125 4.0166 21Z" />
              </svg>
            </div>
            <p className="text-stone-700 mb-6 italic leading-relaxed">
              "The sports facilities are incredible. Being captain of the rugby team taught me more about leadership than any lecture could."
            </p>
            <div className="flex items-center gap-4 pt-6 border-t border-stone-200">
              <img
                src="https://images.unsplash.com/photo-1545696968-1a5245650b91?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                alt="Student"
                className="w-12 h-12 rounded-full object-cover ring-4 ring-white"
              />
              <div>
                <p className="font-bold text-stone-900 text-sm">Jason K.</p>
                <p className="text-stone-600 text-xs uppercase tracking-wide">Student, Grade 12</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
